# 📚 CoZadane – Prosta tablica zadań domowych

**CoZadane** to lekka i szybka aplikacja webowa do organizacji zadań domowych.  
Ma minimalistyczny interfejs w stylu Apple, działa na każdym urządzeniu i jest stworzona specjalnie dla uczniów.  

---

## ✨ Funkcje
- 📝 **Dodawanie zadań domowych** – wpisz przedmiot, opis i datę oddania.  
- 🌓 **Tryb ciemny/jasny** – zapamiętuje ustawienia użytkownika.  
- 📱 **Responsywny design** – wygodny na telefonie i komputerze.  
- 🔐 **Panel administratora** – podgląd i usuwanie zadań.  
- 🚫 **Banowanie IP** – blokada dostępu dla wybranych adresów.  
- ⚡ **Supabase backend** – prosta baza danych i API bez własnego serwera.  

---

## 🛠️ Stos technologiczny
- [Next.js 15](https://nextjs.org/) – framework Reacta z API Routes  
- [TypeScript](https://www.typescriptlang.org/) – typowanie kodu  
- [Supabase](https://supabase.com/) – baza danych i backend  
- [styled-components](https://styled-components.com/) – stylowanie aplikacji  
- [Vercel](https://vercel.com/) – hosting i CI/CD  

---

## 🚀 Uruchamianie lokalnie

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/Maksu2/CoZadane.git
   cd CoZadane
   
2.	**Zainstaluj zależności:**
    ```bash
    npm install
    
3. **Utwórz plik** `.env.local` **w katalogu głównym projektu:**
    ```env
    NEXT_PUBLIC_SUPABASE_URL=<adres URL projektu Supabase>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<anonimowy klucz Supabase>
4. **Uruchom serwer developerski:**
   ```bash
   npm run dev
5.	**Otwórz** `http://localhost:3000`, **żeby zobaczyć stronę**.

---

## 🔒 Bezpieczeństwo

	•	Tabela z banami ma **Row Level Security (RLS)**.
	•	Panel admina jest ukryty pod trudnym do odgadnięcia adresem.
	•	Adresy IP są zapisywane wyłącznie w celach moderacji i bezpieczeństwa.




   





