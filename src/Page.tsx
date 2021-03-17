import styled from "styled-components"
import { breakpoints } from "./constants"

interface ContainerProps {
  readonly justify: string
}

const Container = styled.div<ContainerProps>`
  height: 100vh;
  display: flex;
  align-items: flex-end;

  @media (min-width: ${breakpoints.medium}px) {
    align-items: center;
    justify-content: ${(p) => p.justify};
  }
`
const Block = styled.div`
  width: 100%;
  padding: 2rem;

  @media (min-width: ${breakpoints.medium}px) {
    width: 50%;
  }
`

export function Page(props: ContainerProps) {
  return (
    <Container {...props}>
      <Block>
        <p>
          I'm Alex Kempton, a creative developer and artist working with new
          technologies to create interesting visual experiences. I am the
          creator of Hedron, visual artist for Polyop and creative director at
          Nudibranch Records. Previous clients include Gucci and Red Bull.
        </p>
      </Block>
    </Container>
  )
}
