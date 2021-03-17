import styled from "styled-components"

interface ContainerProps {
  readonly justify: string
}

const Container = styled.div<ContainerProps>`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: ${(p) => p.justify};
`
const Block = styled.div`
  width: 50%;
  padding: 2rem;
  background: #eeeeee;
`

export function Page(props: ContainerProps) {
  return (
    <Container {...props}>
      <Block>
        <h2>Heya!</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque vitae
          possimus blanditiis. Doloremque nostrum, eius odio iste recusandae
          beatae corporis tempore, quasi obcaecati id tenetur quo ducimus!
          Commodi, et assumenda.
        </p>
      </Block>
    </Container>
  )
}
