import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.userId = decoded.id;
    next();
  });
}

router.get("/", authMiddleware, async (req, res) => {
  res.json({
    message: "Bem-vindo ao dashboard protegido 🚀",
    stats: { usuarios: 12, eventos: 5, notificacoes: 3 }
  });
});

export default router;
