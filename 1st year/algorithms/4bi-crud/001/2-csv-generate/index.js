function generateCSV() {
    const NAME = document.querySelector("#fileName").value,
        CONTENT = document.querySelector("#content").value;
        DOWNLOAD_HTML = document.querySelector("#download");

    const thisBlob = new Blob([CONTENT], {type: 'text/plain'});

    DOWNLOAD_HTML.download = NAME;
    DOWNLOAD_HTML.href = URL.createObjectURL(thisBlob);
    DOWNLOAD_HTML.click();

    console.log(thisBlob);
}

// onclick="downloadCSV()"