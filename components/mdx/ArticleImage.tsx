import Image from "next/image";

type ArticleImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export default function ArticleImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 720,
  priority = false,
}: ArticleImageProps) {
  return (
    <figure className="article-figure">
      <div className="article-figure__frame">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1024px) 960px, 100vw"
          className="article-figure__image"
        />
      </div>

      {caption ? (
        <figcaption className="article-figure__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
