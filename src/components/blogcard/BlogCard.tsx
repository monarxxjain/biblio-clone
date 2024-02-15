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

const BlogCard = ({ vari }: { vari: PostData }) => {
  return (
    <Link href={`/en/blogs/${vari._id}`}>
      <div className="flex flex-col space-y-2 bg-primary-bg w-72 hover:scale-105 transition-transform duration-200 ease-out rounded overflow-hidden">
        <div className="w-full h-48 relative" style={{ boxShadow: '0 0 0 2px #000' }}>
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
