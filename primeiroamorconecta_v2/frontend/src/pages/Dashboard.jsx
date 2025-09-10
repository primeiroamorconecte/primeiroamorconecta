import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/api/dashboard", { headers: { Authorization: "Bearer " + token } })
      .then(res => setData(res.data))
      .catch(() => alert("Não autorizado"));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Dashboard</h2>
      {data ? (
        <div>
          <p>{data.message}</p>
          <ul>
            <li>Usuários: {data.stats.usuarios}</li>
            <li>Eventos: {data.stats.eventos}</li>
            <li>Notificações: {data.stats.notificacoes}</li>
          </ul>
        </div>
      ) : <p>Carregando...</p>}
    </div>
  );
}
