import { resize } from "https://deno.land/x/deno_image@0.0.4/mod.ts";
const data = await fetch(
    "https://data.irozhlas.cz/hot-or-not-data/cukrovi.json",
)
    .then((r) => r.json());

data.forEach(async (item: { image: string; key: string }) => {
    const img = await resize(
        Deno.readFileSync(`../../../Desktop/cukrovi_img/${item.image}`),
        { width: 300 },
    );
    Deno.writeFileSync(`../public/img/${item.key}-300.png`, img);
});

data.forEach(async (item: { image: string; key: string }) => {
    const img = await resize(
        Deno.readFileSync(`../../../Desktop/cukrovi_img/${item.image}`),
        { width: 75 },
    );
    Deno.writeFileSync(`../public/img/${item.key}-75.png`, img);
});
export {};
