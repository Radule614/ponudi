import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass, plainToInstance, instanceToPlain } from 'class-transformer';
import { sanitize } from 'express-xss-sanitizer'
@Injectable()
export class SanitizePipe implements PipeTransform {

    constructor(private readonly className: any) { }

    transform(value: any, metadata: ArgumentMetadata) {
        let toPlainValue = instanceToPlain(value)
        let objectValue = sanitize(toPlainValue)
        return plainToInstance(this.className, objectValue, { excludeExtraneousValues: true }) as object as any;
    }
}
