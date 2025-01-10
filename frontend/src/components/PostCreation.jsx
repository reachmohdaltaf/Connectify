import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EmojiPicker from 'emoji-picker-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { IoImagesOutline } from 'react-icons/io5';
import { axiosInstance } from '@/lib/axios';
import { CiFaceSmile } from 'react-icons/ci';
import { MdOutlineArticle } from "react-icons/md";

const PostCreationCard = ({ authUser }) => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isDragging, setIsDragging] = useState(false); // track drag state
    const [showDropArea, setShowDropArea] = useState(false); // control visibility of drop area

    const fileInputRef = useRef(null);
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
        if (!content.trim() && !image) {
            toast.error("Please add some content or an image before posting!");
            return;
        }

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

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        setShowDropArea(false); // hide drop area after drop

        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            readFileAsDataURL(file).then(setImagePreview);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setShowDropArea(true); // show drop area while dragging
    };

    const handleDragLeave = () => {
        setIsDragging(false);
        setShowDropArea(false); // hide drop area when dragging leaves
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleEmojiSelect = (emojiObject) => {
        setContent((prevContent) => prevContent + emojiObject.emoji);
        setShowEmojiPicker(false); // Hide the picker after selecting an emoji
    };

    return (
        <Card className="lg:flex flex-col max-h-screen hidden   mb-1 bg-white shadow-sm p-4 gap-5 items-center">
            <div className="flex flex-col md:flex-row w-full items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                <img
                    src={authUser.profilePicture || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                    className="rounded-full w-10 h-10"
                    alt="Profile"
                />
                <textarea
                    required={true}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="flex-1 bg-gray-100 p-2 h-10 rounded-xl outline-none focus:ring-1 focus:ring-blue-600 w-full md:w-auto"
                />
                <Button
                    onClick={handlePostCreation}
                    variant="tertiary"
                    className="px-4 w-full md:w-auto"
                >
                    Post
                </Button>
            </div>

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

            {/* Conditionally show the drop area when dragging */}
            {showDropArea && (
                <div
                    className="w-full h-32 border-dashed border-2 border-blue-600 bg-blue-100 flex items-center justify-center text-gray-500 mt-4"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    Drop Image Here
                </div>
            )}

            <div className="flex flex-row items-center justify-between w-full gap-2 mt-4">
                <div className="flex gap-2">
                    <label className="cursor-pointer text-xl">
                        <IoImagesOutline title="Add Image" />
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                    <label className="cursor-pointer text-xl">
                        <MdOutlineArticle />
                    </label>
                </div>
                <div className="relative">
                    <CiFaceSmile
                        className="text-xl cursor-pointer"
                        title="Add Emoji"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                    />
                    {showEmojiPicker && (
                        <div className="absolute top-8 right-0 z-10">
                            <EmojiPicker onEmojiClick={handleEmojiSelect} />
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default PostCreationCard;
