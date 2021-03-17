import styled from "styled-components"
import { breakpoints } from "./constants"

interface PageProps {
  justify: string
  title: string
  body: string
  isFullHeightMob?: boolean
}

const Container = styled.div<PageProps>`
  display: flex;
  align-items: flex-end;
  margin-top: ${(p) => (p.isFullHeightMob ? 0 : "40vh")};
  height: ${(p) => (p.isFullHeightMob ? "100vh" : "auto")};

  @media (min-width: ${breakpoints.medium}px) {
    margin-top: 0;
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

  @media (min-width: ${breakpoints.medium}px) {
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
