import { FC, useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import { CountState } from "./types";
import { getCountChips } from "./helpers/getCountChips";

export const App: FC = () => {

  const [countState, setCountState] = useState<CountState>('nothing')

  const firstMessage = 'Has click en los botones para identificar cuantos fichas de cada tipo hay 😁'
  const [resultState, setResultState] = useState(firstMessage)
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const handleCountBlackChips = () => {
    setCountState("BLACK")
    setIsLoading(true)
  }
  const handleCountWhiteChips = () => {
    setCountState("WHITE")
    setIsLoading(true)
  }

  const handleCountBothChips = () => {
    setCountState("BOTH")
    setIsLoading(true)
  }

  const handleCountNothing = () => {
    setCountState("nothing")
    setIsLoading(true)
  }


  useEffect(() => {

    if (isLoading === true) {
      getCountChips(countState)
        .then(data => {
          setIsLoading(false)
          let message = ''
          if (data.type === 'BLACK') message = `${data.count} fichas de color negro ⚫`
          if (data.type === 'WHITE') message = `${data.count} fichas de color blanco ⚪`
          if (data.type === 'BOTH')  message = `${data.black} fichas de color negro ⚫  y ${data.white} fichas de color blanco  ⚪ `
          if (data.type === 'nothing') message= "Has click en los botones para identificar cuantos fichas de cada tipo hay 😁"
          setResultState(message)
          setImageUrl(data.imgUrl)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])


  return <div className="container">
    <header className="header">
      <h1>Cuenta las fichas</h1>
    </header>
    <main className="main">
      {
        (isLoading === true)
          ? <div className="loaderContainer">
            <Loader />
          </div>
          : <div className="imageContainer">

            <img className="imageContainer__img" src={`${imageUrl === '' ? './assets/fichas.jpeg' : imageUrl}`} alt="juego fichas" />
          </div>
      }

      <section className="info">
        {countState === 'WHITE' && <p>{resultState}</p>}
        {countState === 'BLACK' && <p>{resultState}</p>}
        {countState === 'BOTH' && <p>{resultState}</p>}
        {countState === 'nothing' && <p>{resultState}</p>}
      </section>

      <section className="buttonsContainer">
        <button className="button" disabled={isLoading} onClick={handleCountBlackChips}>Contar fichas negras</button>
        <button className="button" disabled={isLoading} onClick={handleCountWhiteChips}>Contar fichas blancas</button>
        <button className="button" disabled={isLoading} onClick={handleCountBothChips}>Contar ambas</button>
        <button className="button" disabled={isLoading} onClick={handleCountNothing}>Reiniciar</button>
      </section>
      {/* <img src="http://127.0.0.1:5000/modificar_imagen" alt="back" /> */}
    </main>
  </div>;
};
