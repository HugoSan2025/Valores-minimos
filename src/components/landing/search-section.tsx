"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import searchData from '@/lib/search-data.json';

type SearchResultItem = {
  "Analito": string;
  "Muestra": string;
  "Límite de Blanco (LB)": string;
  "Límite de Detección (LD)": string;
  "Límite de Cuantificación (LC)": string;
  "Dilucion recomendada": string;
  "Diluyente": string;
  "Valor Maximo Reportable": string;
};

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = () => {
    setHasSearched(true);
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filteredResults = searchData.filter(item => 
      item.Analito.toLowerCase().includes(lowerCaseQuery)
    );
    setResults(filteredResults);
  };
  
  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  return (
    <section id="busqueda" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-foreground mb-8">Buscar en el Sitio</h2>
        <div className="flex relative items-center mb-8 card p-2 bg-card">
          <Input
            type="text"
            id="searchInput"
            placeholder="Escribe un analito para buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleSearchKey}
            className="flex-grow p-3 text-foreground focus:outline-none rounded-l-lg bg-card border-input pr-10"
          />
          {query && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearSearch} 
              className="absolute right-32 h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <i className="fas fa-times text-xl"></i>
              <span className="sr-only">Borrar búsqueda</span>
            </Button>
          )}
          <Button onClick={performSearch} className="btn-primary flex items-center justify-center w-28">
            <i className="fas fa-search mr-2"></i> Buscar
          </Button>
        </div>
        
        <div id="searchResults" className="min-h-[150px]">
          {!hasSearched && (
            <p className="text-center text-muted-foreground mt-4">
              Los resultados de tu búsqueda aparecerán aquí.
            </p>
          )}
          {hasSearched && query.trim() && results.length === 0 && (
             <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 rounded-lg">
                <p className="font-bold">No se encontraron resultados</p>
                <p>Intenta con otra palabra clave. Por ejemplo: 'Glucosa'.</p>
             </div>
          )}
          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((item, index) => (
                <Card key={index} className="bg-card border-l-4 border-primary">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-foreground mb-1">{item.Analito}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <p><strong className="text-primary/90">Muestra:</strong> {item.Muestra}</p>
                      <p><strong className="text-primary/90">Límite de Blanco (LB):</strong> {item["Límite de Blanco (LB)"]}</p>
                      <p><strong className="text-primary/90">Límite de Detección (LD):</strong> {item["Límite de Detección (LD)"]}</p>
                      <p><strong className="text-primary/90">Límite de Cuantificación (LC):</strong> {item["Límite de Cuantificación (LC)"]}</p>
                      <p><strong className="text-primary/90">Dilución recomendada:</strong> {item["Dilucion recomendada"]}</p>
                      <p><strong className="text-primary/90">Diluyente:</strong> {item.Diluyente}</p>
                      <p className="md:col-span-2"><strong className="text-primary/90">Valor Máximo Reportable:</strong> {item["Valor Maximo Reportable"]}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
