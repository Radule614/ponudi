import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass, plainToInstance, instanceToPlain } from 'class-transformer';
import { sanitize } from 'express-xss-sanitizer'
@Injectable()
export class SanitizePipe implements PipeTransform {

    constructor(private readonly className: any) { }

    transform(value: any, metadata: ArgumentMetadata) {
        value = sanitize(value)
        return plainToInstance(this.className, value, { excludeExtraneousValues: true }) as object as any;
    }
}
