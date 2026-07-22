import { site } from './config';

export default function Page() {
  return (
    <main>
      <div className="card">
        <span className="tag">EM CONSTRUÇÃO</span>
        <h1>{site.name}</h1>
        <p>Este site está sendo preparado. Em breve, novidades.</p>
      </div>
    </main>
  );
}
