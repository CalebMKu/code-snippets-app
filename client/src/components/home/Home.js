import React, { useState, useEffect } from 'react'
import axios from "axios";
import Snippet from './Snippet';
import "./Home.scss";

const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");

  useEffect(() => {
    // get snippets
    getSnippets();
  }, []);

  const getSnippets = async () => {
    const snippetRes = await axios.get("http://localhost:5000/snippet/");

    setSnippets(snippetRes.data);
  }

  const saveSnippet = async (e) => {
    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined
    }

    await axios.post("http://localhost:5000/snippet/", snippetData);

    setNewSnippetEditorOpen(false);
    setEditorCode("");
    setEditorDescription("");
    setEditorTitle("");
  }

  const renderSnippet = () => {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })

    return sortedSnippets.map((snippet, i) => (
      <Snippet key={i} snippet={snippet} getSnippet={getSnippets} />
    ))
  }

  return (
    <div className="home">
      {renderSnippet()}
      {!newSnippetEditorOpen && <button className="btn-editor-toggle" onClick={() => setNewSnippetEditorOpen(true)}>Add Snippet</button>}

      {newSnippetEditorOpen && (
        <div className="snippets-editor">
          <div className="snippet-form-wrapper">
            <form className="snippet-form" onSubmit={saveSnippet}>
              <input placeholder="Title" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)} id="editor-title" type="text" />
              <input placeholder="description" value={editorDescription} onChange={(e) => setEditorDescription(e.target.value)} id="description" type="text" />
              <textarea placeholder="Your Code Snippet" value={editorCode} onChange={(e) => setEditorCode(e.target.value)} id="editor-code" type="text"></textarea>
              <button className="btn-save" type="submit">Save Snippet</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
