import { db } from "./firebaseConnection";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // Adicionar dados ao Cloud Firestore

import "./app.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPosts, setIdPosts] = useState("");

  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    //   .then(() => {
    //     alert("DADOS REGISTRADO NO BANCO!");
    //   })
    //   .catch((error) => {
    //     alert("GEROU ERRO" + error);
    //   });
    if (titulo === "" || autor === "") {
      toast.warn("Preencha os campos de titulo e autor");
      return; // Para a execução aqui
    }
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        toast.success("DADOS REGISTRADO NO BANCO!!!");
        setAutor("");
        setTitulo("");
      })
      .catch(() => {
        toast.warn("GEROU UM ERRO AO ADICIONAR");
      });
  }

  async function buscarPosts() {
    // const postRef = doc(db, "posts", "12345");
    // await getDoc(postRef)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor);
    //     setTitulo(snapshot.data().titulo);
    //   })
    //   .catch(() => {
    //     alert("ERRO AO BUSCAR");
    //   });

    const postRef = collection(db, "posts");
    await getDocs(postRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(lista);
      })
      .catch(() => {
        toast.warn("DEU ALGUM ERRO AO BUSCAR OS POSTS");
      });
  }

  async function atualizarPost() {
    const idRef = doc(db, "posts", idPosts);
    await updateDoc(idRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        toast.success("POST ATUALIZADO COM SUCESSO!!");
        setIdPosts("");
        setTitulo("");
        setAutor("");
        buscarPosts();
      })
      .catch((error) => {
        toast.warn(`ERRO AO ATUALIZAR O POST"\n\n${error}`);
      });
  }

  async function deletarPosts(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef)
      .then(() => {
        toast.success("DELETOU ARQUIVO COM SUCESSO");
        buscarPosts();
      })
      .catch((error) => {
        toast.warn(`DEU ERRO AO DELETAR\n\n${error}`);
      });
  }

  return (
    <div>
      <h1>ReactJs + Firebase :)</h1>

      <div className="container">
        <ToastContainer autoClose={3000} />
        <label>ID do Post:</label>
        <input
          type="text"
          placeholder="Digite o ID que deseja atualizar!!"
          value={idPosts}
          onChange={(event) => setIdPosts(event.target.value)}
        />

        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        ></textarea>
        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(event) => setAutor(event.target.value)}
        />
        <div className="btn">
          <button onClick={handleAdd}>Cadastrar</button>
          <button onClick={buscarPosts}>Buscar posts</button>
          <button onClick={atualizarPost}>Atualizar o Post</button>
        </div>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong>
                <span>Titulo: {post.titulo}</span>
                <span>Autor: {post.autor}</span>
                <button
                  className="deletarBtn"
                  onClick={() => deletarPosts(post.id)}
                >
                  Deletar
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
