import styled from "styled-components"

const Main = styled.div`
  position: fixed;
  z-index: 1000;
  background: rgba(252, 102, 3);
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  font-family: sans-serif;
  text-transform: uppercase;

  div {
    height: 1px;
    background: white;
  }
`

export function Loader({ progress }: { progress: number }) {
  return (
    <>
      {progress < 100 && (
        <Main>
          Loading...
          <div style={{ width: `${progress}%` }}></div>
        </Main>
      )}
    </>
  )
}
