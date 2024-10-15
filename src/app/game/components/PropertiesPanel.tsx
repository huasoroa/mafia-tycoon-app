const PropertiesPanel = ({ properties }: { properties: any[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Properties</h2>
      <div className="grid grid-cols-2 pl-4 border-l-2 border-gray-500 h-full">
        {properties.map((property) => (
          <div key={property.id} className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{property.name}</h3>
            <p className="text-sm">Type: {property.type}</p>
            <p className="text-sm">Price: {property.price}</p>
            <p className="text-sm">Revenue: {property.revenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPanel;
