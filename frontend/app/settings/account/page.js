"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import useUserStorage from "@/store/useUserStorage";
import { Edit } from "lucide-react";
import api from "@/lib/api";
import { showSlide } from "@/store/useSlideStorage"


export default function Profile() {
  const { user, setUser } = useUserStorage();

  const [isPasswordPop, setIsPasswordPop] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    user.imgURL ? user.imgURL : "/donkey.jpg"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    try {
      const passwordRes = await api("/auth/verify-password", {
        method: "POST",
        body: JSON.stringify({
          password: data.password,
        }),
      });

      if (passwordRes.isPasswordCorrect) {
        let uploadedImage = null;

        if (selectedImage) {
          const formData = new FormData();

          formData.append("file", selectedImage);
          formData.append(
            "upload_preset",
            "ml_default"
          );

          const cloudinaryRes = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const cloudinaryData = await cloudinaryRes.json()

          uploadedImage = {
            url: cloudinaryData.secure_url,
            publicId: cloudinaryData.public_id,
          };
        }

        const res = await api("/user/update", {
          method: "PUT",
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            imgURL: uploadedImage?.url,
            imgPublicId: uploadedImage?.publicId,
            password: data.password,
          }),
        });

        setUser(res.user);

        setIsPasswordPop(false);
        showSlide(res.message)
      }
    } catch (error) {
      showSlide(error.message)
    }
  };

  return (
    <div className="flex flex-col items-center mt-40 gap-15 ">
      <h1 className="font-semibold text-4xl">Update Profile</h1>
      <form
        className="flex flex-col gap-4 w-1/4 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <div className="relative h-56 w-56 cursor-pointer group">
           

           </div> */}

        <div
          className="relative h-56 w-56 cursor-pointer group"
          onClick={() => document.getElementById("profileImage").click()}
        >
          <Edit className="z-50 absolute inset-0 m-auto opacity-0 group-hover:opacity-100" />

          <img
            className="rounded-full h-56 w-56 group-hover:brightness-50"
            src={imagePreview}
          />

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setSelectedImage(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        <input
          {...register("username", {
            required: "Username is required",
            maxLength: {
              value: 10,
              message: "Username can not be more than 10 char long",
            },
          })}
          type="text"
          placeholder="Username"
          className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="Email"
          className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <Button
          style="!w-full"
          text="Update"
          type="button"
          primary
          onclick={() => setIsPasswordPop(!isPasswordPop)}
        />

        {isPasswordPop && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 ">
            <div className="flex flex-col gap-4 w-1/5 bg-gray-200/70 p-8 rounded-lg ">
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Enter your password to update your profile."
                className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}

              <Button
                style="!w-full"
                text="Confirm"
                type="submit"
                primary
                onclick={() => {}}
              />

              <Button
                style="!w-full !bg-gray-700 hover:!bg-gray-600"
                text="Cancel"
                primary
                onclick={() => setIsPasswordPop(false)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}