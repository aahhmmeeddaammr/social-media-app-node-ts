"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create({ data, options, }) {
        return this.model.create(data, options);
    }
    async createOne({ data, options, }) {
        const [doc] = (await this.model.create([data], options)) || [];
        return doc ?? undefined;
    }
    async findOne({ filter, opts, }) {
        const query = this.model.findOne(filter, opts?.projection, opts?.options);
        if (opts?.populate)
            query.populate(opts?.populate);
        if (opts?.select)
            query.select(opts?.select);
        return await query.exec();
    }
    async findAll(filter = {}, opts = {}) {
        const query = this.model.find(filter, opts.projection, opts.options);
        if (opts.populate)
            query.populate(opts.populate);
        if (opts.select)
            query.select(opts.select);
        return query.exec();
    }
    async findById({ id, opts }) {
        const query = this.model.findById(id, opts?.projection, opts?.options);
        if (opts?.populate)
            query.populate(opts?.populate);
        if (opts?.select)
            query.select(opts?.select);
        return query.exec();
    }
    async updateOne({ filter, update, opts, }) {
        const query = this.model.findOneAndUpdate(filter, update, { new: true, ...opts?.options });
        if (opts?.populate)
            query.populate(opts?.populate);
        if (opts?.select)
            query.select(opts?.select);
        return query.exec();
    }
    async updateById({ id, opts, update, }) {
        const query = this.model.findByIdAndUpdate(id, update, { new: true, ...opts?.options });
        if (opts?.populate) {
            query.populate(opts?.populate);
        }
        if (opts?.select) {
            query.select(opts?.select);
        }
        return query.exec();
    }
    async deleteOne({ filter }) {
        const result = await this.model.deleteOne(filter);
        return result.deletedCount > 0;
    }
    async deleteById({ id, options }) {
        const result = await this.model.findByIdAndDelete(id, options);
        return result != null;
    }
    async count({ filter }) {
        return this.model.countDocuments(filter);
    }
    async exists({ filter }) {
        const result = await this.model.exists(filter);
        return !!result;
    }
    async paginate({ filter, limit, opts, page, }) {
        const skip = (page - 1) * limit;
        const query = this.model.find(filter, opts?.projection, {
            ...opts?.options,
            skip,
            limit,
        });
        if (opts?.populate)
            query.populate(opts?.populate);
        if (opts?.select)
            query.select(opts?.select);
        const [data, total] = await Promise.all([query.exec(), this.model.countDocuments(filter)]);
        return { data, total };
    }
}
exports.BaseRepository = BaseRepository;
