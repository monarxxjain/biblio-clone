import BlogCard from "@/components/blogcard/BlogCard";
import { getPosts } from "../../../sanity/lib/client";

const BlogSection = async ({ language }: { language: string }) => {
    const posts = await getPosts();
    return (
        <div className="flex flex-col lg:px-24 px-4">
            <div className="flex justify-center my-4">
                <h1 className="capitalize text-5xl underline decoration-rose-600 font-bold">Blogs</h1>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 space-y-8">
                {posts.map((post: any) => (
                    <li key={post._id} className="first:mt-8">
                        <BlogCard vari={post} language={language} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogSection;