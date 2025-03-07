document.getElementById("getWeather").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Masukkan nama kota terlebih dahulu!");
        return;
    }

    try {
        const response = await fetch(`/weather/${city}`);
        if (!response.ok) {
            throw new Error("Gagal mengambil data cuaca");
        }

        const data = await response.json();
        document.getElementById("weatherResult").innerHTML = `
            <p>Kota: ${data.city}</p>
            <p>Suhu: ${data.temperature}°C</p>
            <p>Kondisi: ${data.condition}</p>
            <p>Kelembapan: ${data.humidity}%</p>
        `;
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengambil data cuaca.");
    }
});
