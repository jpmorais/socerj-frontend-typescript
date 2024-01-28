import React, { useEffect, useState } from "react";
import Areas, { Area } from "../../models/Areas.ts";

const AreasLista: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasData = await Areas.getAllAreas({});
        setAreas(areasData);
      } catch (error) {
        // Trate erros, se necessário
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Áreas</h1>
      <ul>
        {areas.map((area) => (
          <li key={area.id}>{area.area}</li>
        ))}
      </ul>
    </div>
  );
};

export default AreasLista;
