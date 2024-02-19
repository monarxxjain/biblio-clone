import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

interface Author {
  name: string;
}

interface it {
  _id: string;
  title: string;
}

interface PostData {
  _id: string;
  image: string;
  author: Author;
  publishedAt: string;
  title: string;
  body: string;
  categories: it[];
}

const BlogCard = ({ vari, language }: { vari: PostData, language: string }) => {
  return (
    <Link className="w-1/3" href={`/${language}/blogs/${vari._id}`}>
      <div className="flex flex-col space-y-2 py-6 h-full p-4 sm:p-8 bg-white/40 dark:bg-slate-800 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40 overflow-hidden">
        <div className="h-48 relative" style={{ boxShadow: '0 0 0 2px #000' }}>
          <Image src={vari.image} alt="image" layout="fill" objectFit="cover" />
        </div>
        <div className="flex flex-row">
          <p className="font-semibold text-sm text-primary-brand">
            {vari.author.name},{" "}
            {new Date(vari.publishedAt).toISOString().substring(0, 10)}
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold">{vari.title}</h1>
        </div>
        <div>
          <p className="line-clamp-2">{vari.body}</p>
        </div>
        <div className="flex flex-row flex-wrap space-x-2">
          {vari.categories.map((it) => (
            <p
              key={it._id}
              className="border bg-primary-dark text-primary-bg py-1 px-2 text-xs rounded-full"
            >
              {it.title}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
