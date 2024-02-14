import Image from "next/image";
import { getPosts } from "@/../sanity/lib/client";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { PortableText } from "@portabletext/react";
import { FunctionComponent } from "react";

interface NewpageProps {
    params: {
        slug: any;
    };
}

const Newpage: FunctionComponent<NewpageProps> = async ({ params }) => {
    const postID = params.slug;
    const posts = await getPosts();
    const singlePost = posts.find((post: any) => post._id === postID);

    return (
        <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full'>
            <Header />
            <div className="flex space-y-8 my-8 flex-col lg:px-96 px-4 min-h-screen">
                <div className="w-full flex flex-col justify-center space-y-8 items-center">
                    <p className="text-4xl text-primary-dark  drop-shadow-md underline decoration-rose-600 font-bold ">
                        {singlePost.title}
                    </p>
                    <Image
                        src={singlePost.image}
                        width={600}
                        height={200}
                        alt={singlePost.title}
                        className="backdrop-brightness-100"
                    />
                </div>
                <div>
                    <p className="text-2xl">
                        By{" "}
                        <span className="font-bold text-primary-brand text-red-600 underline">
                            {singlePost.author.name}
                        </span>
                    </p>
                </div>
                <div style={{ fontSize: '22px' }}>
                    <PortableText value={singlePost.content} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Newpage;