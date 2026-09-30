import Image from "next/image";

export default function Page() {

  return (
    <div className="relative min-h-screen w-full bg-slate-950">
      <div className="z-0 absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="z-10 relative flex flex-col items-center mt-64">
          <h1 className="text-[#F9FAFB] font-medium text-6xl">CodeMate</h1>
          <p className="text-[#E5E7EB] text-2xl">A place where you find your new mates</p>
          <p className="text-[#E5E7EB] text-lg">Login to get Started</p>

          <Image src="/placeholder.png" alt="heropicture" className="mt-20 rounded-2xl" width="1200" height="300" />
      </div>
    </div>
  );
}
