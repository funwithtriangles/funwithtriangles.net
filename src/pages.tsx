import styled from "styled-components"

const Box = styled.div`
  font-size: 0.7em;

  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.2);
  // color: #472619;
  border-radius: 5px;

  /* 
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.5); */
`

export function Intro() {
  return (
    <>
      <h2>Hello</h2>
      <p>
        I'm Alex Kempton, a creative developer and artist working with new
        technologies to create interesting visual experiences. I am the creator
        of Hedron, visual artist for Polyop and creative director at Nudibranch
        Records.
      </p>
      <Box>
        <p>
          Scroll down to learn more, or just <a href="#contact">get in touch</a>
          !
        </p>
      </Box>
    </>
  )
}

export function Tech() {
  return (
    <>
      <h2>Playful Technologist</h2>
      <p>
        For me it’s always important to have fun on a project and I’m often
        happiest when working with new tools. AR and VR is an exciting place to
        be at the moment, especially as this is now something that can be
        achieved on a website! I’m always looking for projects with an
        interesting visual or interactive element.
      </p>
      <Box>
        <h3>Some fun things I've made</h3>
        <dl>
          <dt>
            <a href="https://www.instagram.com/ar/2985068164844778/">
              Leapwerm
            </a>
          </dt>
          <dd>
            Instagram filter where you fly through space as an ever evolving
            worm
          </dd>
          <dt>
            <a href="https://www.instagram.com/ar/2985068164844778/">
              Instatrip
            </a>
          </dt>
          <dd>
            Face filters that work in the browser. I wanted to see what was
            possible using only open-source tech (no apps required!)
          </dd>
          <dt>
            <a href="https://thickerthanblood.co.uk/">Thicker than Blood</a>
          </dt>
          <dd>An online rendition of Izdihar Afyouni's conceptual art piece</dd>
        </dl>
      </Box>
    </>
  )
}

export function Engineer() {
  return (
    <>
      <h2>10+ Years an Engineer</h2>
      <p>
        I’ve been solving problems with code since 2010. While I learn towards
        artistic projects, I enjoy all kinds of technical challenge! I've worked
        on various projects, such as online banking interfaces, data
        visualisations, desktop software and interactive maps.
      </p>
      <Box>
        <h3>Hedron</h3>
        <p>
          I created and actively maintain{" "}
          <a href="https://github.com/nudibranchrecords/hedron">Hedron</a>, an
          open source tool for designing and performing live visual shows. It
          has to be one of the most complicated projects I have worked on and
          continues to grow. I was invited to do a{" "}
          <a href="https://www.youtube.com/watch?v=B6z0flqI9Lk">
            short talk about the software at React Day Berlin
          </a>
          .
        </p>
      </Box>
    </>
  )
}

export function Art() {
  return (
    <>
      <h2>Art for Music</h2>
      <p>
        I’m lucky to have had the opportunity to work with various musicians
        over the years. As well as creating and performing live visuals for
        Polyop, I’ve produced various pieces for other artists too, such as
        album artwork and music videos.
      </p>
      <Box>
        <h3>Gene-weaving octopodes</h3>
        <p>
          One piece I'm particularly proud of is for the Nudibranch compilation
          album,{" "}
          <a href="https://nudibranchrecords.bandcamp.com/album/molecular-selections">
            Molecular Selections
          </a>
          . As well as the main artwork, I also produced animated promotional
          pieces along with some funky cassette designs.
        </p>
      </Box>
    </>
  )
}

export function Contact() {
  return (
    <>
      <h2 id="contact">Get in touch</h2>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:alex@funwithtriangles.net">
            alex@funwithtriangles.net
          </a>
        </li>
        <li>
          <strong>Twitter:</strong> @
          <a href="https://twitter.com/funtriangles">funtriangles</a>
        </li>
        <li>
          <strong>Instagram:</strong> @
          <a href="https://instagram.com/funwithtriangles">funwithtriangles</a>
        </li>
        <li>
          <strong>Github:</strong>{" "}
          <a href="https://github.com/funwithtriangles">funwithtriangles</a>
        </li>
      </ul>
    </>
  )
}
