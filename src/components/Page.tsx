import styled from "styled-components"
import { breakpoints, dimensions } from "../constants"

interface PageProps {
  justify: string
  isFullHeightMob?: boolean
  content: Function
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
    justify-content: flex-end;
  }
`
const Block = styled.div<PageProps>`
  width: 100%;
  padding: 2rem;
  height: ${(p) => (p.isFullHeightMob ? "60vh" : "auto")};
  display: flex;
  align-items: center;
  backdrop-filter: blur(20px);
  background: rgba(252, 102, 3, 0.5);
  border-width: 1px 0;

  h2 {
    font-size: 3rem;
    line-height: 1;
  }

  @media (min-width: ${breakpoints.medium}px) {
    min-height: 100vh;
    padding: 4rem;
    border-width: 1px;
    height: auto;
    width: 50%;

    h2 {
      font-size: 6rem;
      line-height: 1;
    }
  }
`

export function Page(props: PageProps) {
  return (
    <Container {...props}>
      <Block {...props}>
        <div>{props.content()}</div>
      </Block>
    </Container>
  )
}
