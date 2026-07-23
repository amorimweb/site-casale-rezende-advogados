'use client';
import { site } from './config';
import { Icon } from './icons';
import { useEffect, useState } from 'react';

const Arrow = () => <span aria-hidden>↗</span>;

export default function Page() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('seen')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((e) => io.observe(e));

    const cleanups: Array<() => void> = [];
    const media = window.matchMedia('(min-width: 761px)');
    document.querySelectorAll<HTMLElement>('.areaGrid').forEach((track) => {
      const onWheel = (event: WheelEvent) => {
        if (!media.matches || track.scrollWidth <= track.clientWidth + 2 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        const rect = track.getBoundingClientRect();
        if (rect.top < -24 || rect.bottom > window.innerHeight + 24) return;
        const max = track.scrollWidth - track.clientWidth;
        const movingRight = event.deltaY > 0;
        const canMove = movingRight ? track.scrollLeft < max - 1 : track.scrollLeft > 1;
        if (!canMove) return;
        event.preventDefault();
        track.scrollBy({ left: event.deltaY, behavior: 'auto' });
      };
      track.addEventListener('wheel', onWheel, { passive: false });
      cleanups.push(() => track.removeEventListener('wheel', onWheel));
    });

    return () => { io.disconnect(); cleanups.forEach((fn) => fn()); };
  }, []);

  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de agendar uma conversa com ' + site.name + '.')}`;
  const tel = `tel:+${site.whatsapp}`;
  const cta = 'Fale com o escritório';

  return (
    <main>
      <header>
        <a className="brand" href="#inicio"><b>{site.monogram}</b><span>{site.short}</span></a>
        <button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="nav" aria-label={menu ? 'Fechar menu' : 'Abrir menu'}>{menu ? 'Fechar' : 'Menu'}</button>
        <nav id="nav" className={menu ? 'open' : ''} aria-label="Navegação principal">
          <a href="#atuacao" onClick={() => setMenu(false)}>Atuação</a>
          <a href="#escritorio" onClick={() => setMenu(false)}>Escritório</a>
          <a href="#contato" onClick={() => setMenu(false)}>Contato</a>
          <a className="navCta" href={wa}>Agendar <Arrow /></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="heroFrame" aria-hidden="true">
          <div className="seal"><b>{site.monogram}</b></div>
        </div>
        <div className="heroCopy reveal">
          <small>{site.kicker}</small>
          <h1>{site.title}</h1>
          <p>{site.intro}</p>
          <div className="actions">
            <a className="primary" href={wa}>{cta} <Arrow /></a>
            <a className="textLink" href="#atuacao">Conheça a atuação ↓</a>
          </div>
        </div>
      </section>

      <section className="manifest reveal">
        <span>01 · NOSSA VISÃO</span>
        <blockquote>&ldquo;{site.quote}&rdquo;</blockquote>
      </section>

      <section className="areas" id="atuacao">
        <div className="sectionHead reveal">
          <span>02 · ÁREAS DE ATUAÇÃO</span>
          <h2>Precisão técnica<br />em cada caso.</h2>
          <p>Cada demanda é conduzida com rigor, ética e atenção institucional aos detalhes.</p>
        </div>
        <div className="areaGrid">
          {site.areas.map((a, i) => (
            <article className="reveal" key={a[0]}>
              <div className="areaTop"><Icon name={a[2]} /><i>0{i + 1}</i></div>
              <h3>{a[0]}</h3>
              <p>{a[1]}</p>
              <Arrow />
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="escritorio">
        <div className="aboutVisual reveal" aria-hidden="true">
          <img src="/office.jpg" alt="" loading="lazy" decoding="async" />
          <div className="visualBlock" />
          <div className="stamp">{site.monogram}<small>PARAUAPEBAS · PA</small></div>
        </div>
        <div className="aboutCopy reveal">
          <span>03 · O ESCRITÓRIO</span>
          <h2>Tradição que se<br />prova em resultado.</h2>
          <p>{site.about}</p>
          <ul>
            {site.values.map((v) => (
              <li key={v}><b>✓</b>{v}</li>
            ))}
          </ul>
          <a className="textLink" href={wa}>Converse sobre seu caso <Arrow /></a>
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contactTitle reveal">
          <small>04 · CONTATO</small>
          <h2>Vamos conversar?</h2>
          <p>Agende uma conversa inicial para apresentar sua demanda ao escritório.</p>
          <a className="primary light" href={wa}>Abrir WhatsApp <Arrow /></a>
        </div>
        <div className="contactInfo reveal">
          <div><small>ENDEREÇO</small><p>{site.address}</p><a href={site.map}>Ver no Google Maps <Arrow /></a></div>
          <div><small>TELEFONE</small><p><a href={tel}>{site.phone}</a></p></div>
        </div>
      </section>

      <footer>
        <div className="footTop">
          <div className="footBrand">
            <div className="brand"><b>{site.monogram}</b><span>{site.short}</span></div>
            <p>{site.about}</p>
          </div>
          <div className="footCol">
            <small>NAVEGUE</small>
            <a href="#atuacao">Atuação</a>
            <a href="#escritorio">Escritório</a>
            <a href="#contato">Contato</a>
          </div>
          <div className="footCol">
            <small>ATENDIMENTO</small>
            <span>{site.address}</span>
            <a href={tel}>{site.phone}</a>
            <a href={wa}>WhatsApp</a>
          </div>
        </div>
        <div className="footBottom">
          <span>© 2026 {site.short}</span>
          <p>Conteúdo com caráter informativo. Não substitui a análise individual de um advogado.</p>
        </div>
      </footer>

      <a className="whatsapp" href={wa} aria-label="Falar pelo WhatsApp">WhatsApp</a>
    </main>
  );
}
