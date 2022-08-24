const attribute_pattern = "(\\w+\\s*(((class=\"[\\w\\d_-\\s]*\"\\s*)|(style=\"[\\w\\d_-\\s:;,()%]*\"\\s*))*))";

export const richtextEncoder = (text) => {
  if(!text) return "";
  const pattern = new RegExp(`(<)${attribute_pattern}(>)`, 'g');
  return text.replaceAll(pattern, '#tag_begin#$2#tag_end#');
}

export const richtextDecoder = (text) => {
  if(!text) return "";
  const pattern = new RegExp(`(#tag_begin#)${attribute_pattern}(#tag_end#)`, 'g');
  const tagnamePattern = new RegExp("(<)(script|iframe|img)", 'g');
  return text.replaceAll(pattern, '<$2>').replaceAll(tagnamePattern, '$1p');
}