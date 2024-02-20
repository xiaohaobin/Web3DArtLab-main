function __getPointBaseLength() {
  const testDiv = document.createElement('div') // get ppi
  testDiv.setAttribute(
    'style',
    'height: 1in; visibility: hidden; position: absolute; margin: 0; padding: 0;'
  )
  document.body.appendChild(testDiv)
  const baseLen = testDiv.clientHeight
  const inchToMeter = 0.0254
  return inchToMeter / baseLen
}

export const unitConversionByMeter = {
  file: 1, // hard code to be meters now. TODO: fix it later
  m: 1,
  mm: 0.001,
  cm: 0.01,
  ft: 0.3048,
  in: 0.0254,
  pt: __getPointBaseLength()
}

export const unitLabel = {
  file: 'm',
  m: 'm',
  mm: 'mm',
  cm: 'cm',
  ft: 'ft',
  in: 'in',
  pt: 'pt'
}

const _getSuffix = (power) => {
  if (power === 2) {
    return '²'
  }
  if (power === 3) {
    return '³'
  }
  return ''
}

export const getUnitStr = (unit, power = 1) => {
  return unitLabel[unit] + _getSuffix(power)
}

/**
 * Gets unit
 * value
 * sourceUnit
 * targetUnit
 */
export const getLengthValueByUnit = (value, sourceUnit, targetUnit, power = 1) => {
  if (targetUnit === null || targetUnit === undefined) {
    targetUnit = sourceUnit
  }
  if (targetUnit === sourceUnit) {
    return {
      value,
      unit: getUnitStr(targetUnit)
    }
  } else {
    const targetValue =
      value * Math.pow(unitConversionByMeter[sourceUnit] / unitConversionByMeter[targetUnit], power)
    return {
      value: targetValue,
      unit: getUnitStr(targetUnit) + _getSuffix(power)
    }
  }
}
