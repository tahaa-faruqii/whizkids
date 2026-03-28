const commonColor = {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
    activeColor: '#17b2ce',
    deactiveColor: '#DE5E6950',
    boxActiveColor: '#DE5E6940',

};

const light = {
    themeColor: '#FFFFFF',
    white: '#000000',
    sky: '#DE5E69',
    gray: 'gray',
    ...commonColor,
};

const dark = {
    themeColor: '#000000',
    white: '#FFFFFF',
    sky: '#831a23',
    gray: 'white',
    ...commonColor,
};
const container_light = {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
}

const container_dark = {
    flex: 1,
    backgroundColor: '#161c1c',
    // alignItems: 'center',
    // justifyContent: 'center',
}
const text_light = {
    marginBottom: 20,
    color: '#000'
}
export default { light, dark, container_dark, container_light, text_light };