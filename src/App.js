import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const App = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);

    return (
        <BrowserRouter>
            <PublicRoutes />

            <Switch>
                <Route path="/backend">
                    { authState === AuthState.SignedIn && user
                    ?
                    <PrivateRoutes />
                    :
                    <AmplifyAuthenticator className="amplify-authenticator" usernameAlias="email">
                        <AmplifySignUp
                            slot="sign-up"
                            usernameAlias="email"
                            formFields={[{
                                type: "email",
                                required: true,
                            }, {
                                type: "password",
                                required: true,
                            }]}
                        />
                    </AmplifyAuthenticator>
                    }
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App

/*
import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }

function App() {
      const [notes, setNotes] = useState([]);
      const [formData, setFormData] = useState(initialFormState);

      useEffect(() => {
              fetchNotes();
            }, []);



      async function fetchNotes() {
              const apiData = await API.graphql({ query: listNotes });
              const notesFromAPI = apiData.data.listNotes.items;
              await Promise.all(notesFromAPI.map(async note => {
                      if (note.image) {
                                const image = await Storage.get(note.image);
                                note.image = image;
                              }
                      return note;
                    }))
              setNotes(apiData.data.listNotes.items);
            }

      async function createNote() {
              if (!formData.name || !formData.description) return;
              await API.graphql({ query: createNoteMutation, variables: { input: formData } });
              if (formData.image) {
                      const image = await Storage.get(formData.image);
                      formData.image = image;
                    }
              setNotes([ ...notes, formData ]);
              setFormData(initialFormState);
            }

      async function deleteNote({ id }) {
              const newNotesArray = notes.filter(note => note.id !== id);
              setNotes(newNotesArray);
              await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
            }

      async function onChange(e) {
              if (!e.target.files[0]) return
              const file = e.target.files[0];
              setFormData({ ...formData, image: file.name });
              await Storage.put(file.name, file);
              fetchNotes();
            }
      return (
              <div className="App">
                <h1>My Notes App</h1>
                <input
                  onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                  placeholder="Note name"
                  value={formData.name}
                />
                <input
                  onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                  placeholder="Note description"
                  value={formData.description}
                />
                <input
                  type="file"
                  onChange={onChange}
                />
                <button onClick={createNote}>Create Note</button>
                <div style={{marginBottom: 30}}>
                  {
                    notes.map(note => (
                        <div key={note.id || note.name}>
                          <h2>{note.name}</h2>
                          <p>{note.description}</p>
                          <button onClick={() => deleteNote(note)}>Delete note</button>
                        {
                        note.image && <img src={note.image} alt="" style={{width: 400}} />
                        }
                        </div>
                      ))
                  }
                </div>
                <AmplifySignOut />
              </div>
            );
    }

export default withAuthenticator(App);
*/
