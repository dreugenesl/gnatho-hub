import { ButtonLink, Container } from "@/components/ui";

/** 404 усередині мовного сегмента. Тут немає доступу до params, тому текст двомовний. */
export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold text-sand-700">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Сторінку не знайдено · Page not found</h1>
      <ButtonLink to="/" className="mt-8">
        На головну · Home
      </ButtonLink>
    </Container>
  );
}
