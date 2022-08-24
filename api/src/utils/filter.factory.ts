import { FieldType } from "src/categories/enums/field-type.enum"
import { IAdditionalField } from "src/categories/interfaces/additional-field.interface"
import { IDoubleSliderParams } from "./double-slider-params.interface"

export class FilterFactory {
    public static createFilter(queryParams, filter: IAdditionalField, additional = false) {
        if (filter.type == FieldType.CHECKBOX) {
            return this.generateCheckboxQueryWithFilter(queryParams, filter, additional)
        } else if (filter.type == FieldType.DOUBLE_SLIDER) {
            return this.generateDualSliderQuery(queryParams, filter, additional)
        } else if (filter.type == FieldType.SEARCH) {
            return this.generateSearchQuery(queryParams, filter, additional)
        }
        return null
    }

    private static generateCheckboxQueryWithFilter(queryParams: any[], param: IAdditionalField, additional = false) {
        let val: string = queryParams[param.field]
        if (!val) return null
        let chunks: string[] = val.split(',')
        let result = {}
        if (additional) result[`additionalFields.${param.field}`] = chunks
        else result[param.field] = chunks
        return result
    }

    private static generateDualSliderQuery(queryParams: any[], param: IAdditionalField, additional = false) {

        let val: IDoubleSliderParams = queryParams[param.field]
        if (!val) return null
        let from: number = +val.from
        let to: number = +val.to

        if (!from || !to) return null

        let result = {}
        if (additional) result[`additionalFields.${param.field}`] = { $gte: from, $lte: to }
        else result[param.field] = { $gte: from, $lte: to }
        return result
    }

    private static generateSearchQuery(queryParams, param: IAdditionalField, additional = false) {
        let val = queryParams[param.field]
        if (!val) return null
        let result = {}
        let regExMatch = this.escapeRegExp(val)

        if (additional) result[`additionalFields.${param.field}`] = new RegExp(regExMatch)
        else result[param.field] = new RegExp(regExMatch)
        return result
    }

    private static escapeRegExp(str: string) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
}