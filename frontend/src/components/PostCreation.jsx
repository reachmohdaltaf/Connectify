import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useRef } from 'react'; // Make sure useRef is imported
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { IoImagesOutline } from 'react-icons/io5';
import { axiosInstance } from '@/lib/axios';
import { CiFaceSmile } from 'react-icons/ci';

const PostCreationCard = ({ authUser }) => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null); // Define fileInputRef here

    const queryClient = useQueryClient();

    const { mutate: createPostMutation, isPending } = useMutation({
        mutationFn: async (postData) => {
            const res = await axiosInstance.post("/posts/create", postData, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        },
        onSuccess: () => {
            resetForm();
            toast.success("Post created successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (err) => {
            toast.error(err.response.data.message || "Failed to create post");
        },
    });

    const handlePostCreation = async () => {
        try {
            const postData = { content };
            if (image) postData.image = await readFileAsDataURL(image);

            createPostMutation(postData);
        } catch (error) {
            console.error("Error in handlePostCreation:", error);
        }
    };

    const resetForm = () => {
        setContent("");
        setImage(null);
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            readFileAsDataURL(file).then(setImagePreview);
        } else {
            setImagePreview(null);
        }
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <Card className="flex flex-col max-h-screen  bg-white rounded-sm shadow-none p-4 gap-8 items-center">
            {/* Profile Image */}
            <div className="flex flex-col md:flex-row w-full  items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                <img
                    src={authUser.ProfilePicture || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                    className="rounded-full w-10 h-10"
                    alt="Profile"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="flex-1 bg-gray-100 p-2 h-10 rounded-lg outline-none focus:ring-1 focus:ring-blue-600 w-full md:w-auto"
                />
                <Button
                    onClick={handlePostCreation}
                    variant="tertiary"
                    className="px-4 w-full md:w-auto"
                >
                    Post
                </Button>
            </div>

            {/* Image Preview */}
            {imagePreview && (
                <div className="w-full flex items-center justify-start relative mt-4">
                    <img
                        src={imagePreview}
                        alt="Selected"
                        className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                        onClick={() => setImagePreview(null)}
                        className="absolute top-1 left-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        title="Remove Image"
                    >
                        <AiOutlineClose className="text-sm" />
                    </button>
                </div>
            )}

            {/* Footer Section */}
            <div className="flex flex-row items-center justify-between w-full gap-2">
                <label className="cursor-pointer text-2xl">
                    <IoImagesOutline title="Add Image" />
                    <input
                        ref={fileInputRef} // Now using fileInputRef
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
                <CiFaceSmile className="text-2xl cursor-pointer" title="Add Emoji" />
            </div>
        </Card>
    );
};

export default PostCreationCard;
