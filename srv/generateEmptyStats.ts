// const url = "https://data.irozhlas.cz/hot-or-not-data/cukrovi.json";
// const res = await fetch(url);
// const rawdata = await res.json();
// const data = rawdata.filter((item: { use: boolean }) => item.use);

// const result = data.map((item: { id: number }) => {
//     return {
//         id: item.id,
//         w: 0,
//         l: 0,
//         c: data
//             .filter((j: { id: number }) => j.id !== item.id)
//             .map((j: { id: number }) => {
//                 return {
//                     id: j.id,
//                     w: 0,
//                     l: 0,
//                 };
//             }),
//     };
// });

// Deno.writeTextFileSync("cukrovi-stats.json", JSON.stringify(result));
export {};
