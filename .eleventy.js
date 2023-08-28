module.exports = (eleventyConfig) => {
    eleventyConfig.addPassthroughCopy('static');
    eleventyConfig.addPassthroughCopy('levels');
    eleventyConfig.setServerOptions({showAllHosts: true});

    // Tofino-100 color set from https://zenodo.org/record/8035877
    eleventyConfig.addGlobalData("tofino", [
        '#DED9FF', '#D6D3FB', '#D0CFF9', '#C8CAF6', '#C3C6F3', '#BBC0F0', '#B6BCED', '#AEB7EA', '#A6B1E6', '#A0ADE4',
        '#98A8E1', '#93A4DE', '#8B9FDB', '#869BD8', '#7E95D4', '#768FD0', '#718BCD', '#6985C8', '#6481C5', '#5C7BBF',
        '#5575B8', '#5171B4', '#4A6BAC', '#4767A7', '#4262A0', '#3E5E9A', '#3A5993', '#37548B', '#345086', '#314C7E',
        '#2F4979', '#2C4471', '#2A416C', '#273C65', '#24385D', '#223559', '#203151', '#1E2E4D', '#1C2A46', '#1A2841',
        '#18243B', '#162034', '#151E30', '#131B2A', '#121926', '#111721', '#10161E', '#0E151A', '#0D1517', '#0D1515',
        '#0D1613', '#0D1712', '#0E1A11', '#101C12', '#111F12', '#122214', '#132515', '#142916', '#152C18', '#17301A',
        '#19351C', '#1A381D', '#1D3D20', '#1E4021', '#204524', '#224825', '#244D28', '#27532B', '#28562C', '#2B5B2F',
        '#2C5F31', '#2F6434', '#316836', '#346D39', '#37733C', '#39773E', '#3D7D41', '#3F8144', '#448747', '#488B4A',
        '#4E914E', '#559753', '#5A9C56', '#62A25A', '#67A65E', '#70AB63', '#79B167', '#7FB46B', '#88B970', '#8EBD73',
        '#97C278', '#9DC57B', '#A6CA7F', '#AFCE84', '#B5D187', '#BDD68C', '#C3D98F', '#CCDE94', '#D2E197', '#DBE69B',
    ]) // prettier-ignore
    return {dir: {input: 'src'}};
};
