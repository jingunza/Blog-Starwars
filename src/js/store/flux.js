import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      planetas: [],
      people: [],
      data: [],
      favorites: [],
    },
    actions: {
      delFavorites:(item)=>{
       console.log(typeof(item.element),"item")
        const arr = getStore().favorites.filter((element) =>  element !== item.element)
        
        setStore({favorites:arr})
      },
      addFavorites:(name)=>{
       setStore({ favorites: [...getStore().favorites, name]})
      },
      // Use getActions to call a function within a fuction
      getid: (url) => {
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Los datos no se han podido cargar");
            }
          })
          .then((datos) => {
            let aux = datos.result.properties;
            console.log(aux);
            setStore({ data: aux });
          }).catch((error) => console.log(error));
      },

      loadSomeData: () => {
        /**
          fetch().then().then(data => setStore({ "foo": data.bar }))
        */

        fetch("https://www.swapi.tech/api/planets/")
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("los planetas  no se han podido cargar");
            }
          })
          .then((planetas) => {
            let aux = planetas.results;
            setStore({ planetas: aux });
          })
          .catch((error) => console.log(error));

        fetch("https://www.swapi.tech/api/people")
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("los personajes no se han podido cargar");
            }
          })
          .then((personas) => {
            let aux = personas.results;
            setStore({ people: aux });
          })
          .catch((error) => console.log(error));
      },
    },
  };
};

export default getState;
