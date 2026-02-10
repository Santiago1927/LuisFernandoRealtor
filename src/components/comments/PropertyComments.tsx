"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, ThumbsUp, Flag } from "lucide-react";
import { useAuthContext } from "@/components/auth/AuthContext";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { toast } from "sonner";

interface Comment {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userEmail: string;
  comment: string;
  likes: number;
  createdAt: any;
}

interface PropertyCommentsProps {
  propertyId: string;
}

export default function PropertyComments({
  propertyId,
}: PropertyCommentsProps) {
  const { user } = useAuthContext();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Cargar comentarios en tiempo real
  useEffect(() => {
    if (!propertyId) return;

    setLoading(true);
    const commentsRef = collection(db, "property_comments");
    const q = query(
      commentsRef,
      where("propertyId", "==", propertyId),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        setComments(commentsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error al cargar comentarios:", error);
        setLoading(false);
        toast.error("Error al cargar comentarios");
      },
    );

    return () => unsubscribe();
  }, [propertyId]);

  // Enviar comentario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Debes iniciar sesión para comentar");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Escribe un comentario");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "property_comments"), {
        propertyId,
        userId: user.uid,
        userName: user.displayName || "Usuario",
        userEmail: user.email,
        comment: newComment.trim(),
        likes: 0,
        createdAt: serverTimestamp(),
      });

      setNewComment("");
      toast.success("Comentario publicado");
    } catch (error) {
      console.error("Error al publicar comentario:", error);
      toast.error("Error al publicar comentario");
    } finally {
      setSubmitting(false);
    }
  };

  // Dar like a comentario
  const handleLike = async (commentId: string) => {
    if (!user) {
      toast.error("Debes iniciar sesión para dar like");
      return;
    }

    try {
      const commentRef = doc(db, "property_comments", commentId);
      await updateDoc(commentRef, {
        likes: increment(1),
      });
    } catch (error) {
      console.error("Error al dar like:", error);
      toast.error("Error al dar like");
    }
  };

  // Formatear fecha
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Ahora";
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    if (diffInHours < 24) return `Hace ${diffInHours} h`;
    if (diffInDays < 7) return `Hace ${diffInDays} d`;
    return date.toLocaleDateString("es-CO");
  };

  return (
    <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
          <MessageCircle className="w-5 h-5 text-primary-600" />
          <span>Opiniones sobre esta propiedad</span>
          <span className="text-sm font-normal text-zinc-500">
            ({comments.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulario para nuevo comentario */}
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comparte tu opinión sobre esta propiedad..."
              className="min-h-[100px] resize-none border-zinc-200 dark:border-zinc-700 focus:border-primary-500 dark:focus:border-primary-500"
              disabled={submitting}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                {submitting ? (
                  "Publicando..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Publicar Comentario
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
            <MessageCircle className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <p className="text-zinc-600 dark:text-zinc-400 mb-3">
              Inicia sesión para dejar tu opinión
            </p>
            <Button
              asChild
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              <a href="/admin">Iniciar Sesión</a>
            </Button>
          </div>
        )}

        {/* Lista de comentarios */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-zinc-500">
              Cargando comentarios...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500 dark:text-zinc-400">
                Sé el primero en opinar sobre esta propiedad
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center font-semibold rounded-full flex-shrink-0">
                    {comment.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {comment.userName}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {comment.comment}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(comment.id)}
                        className="text-zinc-500 hover:text-primary-600 dark:hover:text-primary-400 h-8 px-2"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span className="text-xs">
                          {comment.likes > 0 ? comment.likes : ""}
                        </span>
                      </Button>
                      {user && user.email === "admin@realhaus.com" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-red-600 h-8 px-2"
                        >
                          <Flag className="w-4 h-4 mr-1" />
                          <span className="text-xs">Reportar</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
