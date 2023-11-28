import s from '@/styles/loader.module.css';

export const Loader = () => {
  return (
    <section className={s.root}>
      <div className={s.spinner} />
      <h2>Cargando...</h2>
    </section>
  );
};
