interface Page {
  id: number;
  name: string;
  category: string;
  // ... other fields
}

function Navigation({ pages }: { pages: Page[] }) {
  // Group pages by category
  const pagesByCategory = pages.reduce((acc, page) => {
    const category = page.category || 'uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(page);
    return acc;
  }, {} as Record<string, Page[]>);

  return (
    <nav className="flex flex-col gap-4">
      {Object.entries(pagesByCategory).map(([category, categoryPages]) => (
        <div key={category} className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg capitalize">
            {category.replace(/-/g, ' ')}
          </h2>
          <div className="flex flex-col gap-1 pl-4">
            {categoryPages.map((page) => (
              <Link 
                key={page.id}
                href={`/${page.name}`}
                className="hover:text-primary transition-colors"
              >
                {page.name.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
} 