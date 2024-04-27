import Header from '@/components/header';

export default function IndexPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col pt-16 min-h-screen">
        <div className="flex flex-col p-8">
          <h1 className="text-2xl">Content</h1>
        </div>
      </main>
    </>
  );
}
