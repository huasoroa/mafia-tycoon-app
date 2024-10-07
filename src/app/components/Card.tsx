type CardProps = {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
};

const Card = ({ title, description, image, children }: CardProps) => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-8 bg-gray-600 rounded-lg shadow-md aspect-square">
      <div>{title && <h2 className="text-xl font-bold">{title}</h2>}</div>
      {description && <p className="text-gray-500">{description}</p>}
      {image && (
        <img className="w-full h-1/2 object-cover" src={image} alt={title} />
      )}
      {children}
    </div>
  );
};

export default Card;
