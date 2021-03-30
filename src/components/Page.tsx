import styled from "styled-components"
import { breakpoints, dimensions } from "../constants"

interface PageProps {
  justify: string
  title: string
  body: string
  isFullHeightMob?: boolean
}

const Container = styled.div<PageProps>`
  display: flex;
  align-items: flex-end;
  padding-top: ${(p) =>
    p.isFullHeightMob ? 0 : `${dimensions.mobSceneRatio * 100}vw`};
  height: ${(p) => (p.isFullHeightMob ? "100vh" : "auto")};
  color: white;

  @media (min-width: ${breakpoints.medium}px) {
    padding-top: 0;
    height: 100vh;
    align-items: center;
    justify-content: ${(p) => p.justify};
  }
`
const Block = styled.div<PageProps>`
  width: 100%;
  padding: 2rem;
  height: ${(p) => (p.isFullHeightMob ? "60vh" : "auto")};
  display: flex;
  align-items: center;
  backdrop-filter: blur(6px);
  border: dashed white;
  border-width: 1px 0;

  @media (min-width: ${breakpoints.medium}px) {
    border-width: 1px;
    height: auto;
    width: 50%;
  }
`

export function Page(props: PageProps) {
  return (
    <Container {...props}>
      <Block {...props}>
        <div>
          <h2>{props.title}</h2>
          <p>{props.body}</p>
        </div>
      </Block>
    </Container>
  )
}
