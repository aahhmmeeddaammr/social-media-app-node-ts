import {
  CreateOptions,
  FilterQuery,
  HydratedDocument,
  Model,
  PopulateOptions,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export interface FindOptions<TDocument> {
  projection?: ProjectionType<TDocument>;
  options?: QueryOptions;
  populate?: string | PopulateOptions[];
  select?: string;
}

export abstract class BaseRepository<TDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  /**
   * Create multiple documents
   */
  async create({
    data,
    options,
  }: {
    data: Array<Partial<TDocument>>;
    options?: CreateOptions;
  }): Promise<HydratedDocument<TDocument>[]> {
    return this.model.create(data, options);
  }

  /**
   * Create a single document
   */
  async createOne({
    data,
    options,
  }: {
    data: Partial<TDocument>;
    options?: CreateOptions;
  }): Promise<HydratedDocument<TDocument> | undefined> {
    const [doc] = (await this.model.create([data], options)) || [];
    return doc ?? undefined;
  }

  /**
   * Find one document
   */
  async findOne({
    filter,
    opts,
  }: {
    filter: FilterQuery<TDocument>;
    opts?: FindOptions<TDocument> | null;
  }): Promise<HydratedDocument<TDocument> | null> {
    const query = this.model.findOne(filter, opts?.projection, opts?.options);
    if (opts?.populate) query.populate(opts?.populate as PopulateOptions[]);
    if (opts?.select) query.select(opts?.select);
    return await query.exec();
  }

  /**
   * Find all documents
   */
  async findAll(filter: FilterQuery<TDocument> = {}, opts: FindOptions<TDocument> = {}): Promise<HydratedDocument<TDocument>[]> {
    const query = this.model.find(filter, opts.projection, opts.options);
    if (opts.populate) query.populate(opts.populate as PopulateOptions[]);
    if (opts.select) query.select(opts.select);
    return query.exec();
  }

  /**
   * Find by ID
   */
  async findById({ id, opts }: { id: string; opts?: FindOptions<TDocument> }): Promise<HydratedDocument<TDocument> | null> {
    const query = this.model.findById(id, opts?.projection, opts?.options);
    if (opts?.populate) query.populate(opts?.populate as PopulateOptions[]);
    if (opts?.select) query.select(opts?.select);
    return query.exec();
  }

  /**
   * Update one document
   */
  async updateOne({
    filter,
    update,
    opts,
  }: {
    filter: FilterQuery<TDocument>;
    update: UpdateQuery<TDocument>;
    opts?: FindOptions<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    const query = this.model.findOneAndUpdate(filter, update, { new: true, ...opts?.options });
    if (opts?.populate) query.populate(opts?.populate as PopulateOptions[]);
    if (opts?.select) query.select(opts?.select);
    return query.exec();
  }

  /**
   * Update by ID
   */
  async updateById({
    id,
    opts,
    update,
  }: {
    id: string;
    update: UpdateQuery<TDocument>;
    opts?: FindOptions<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    const query = this.model.findByIdAndUpdate(id, update, { new: true, ...opts?.options });

    if (opts?.populate) {
      query.populate(opts?.populate as PopulateOptions[]);
    }

    if (opts?.select) {
      query.select(opts?.select);
    }

    return query.exec();
  }
  /**
   * Delete one document
   */
  async deleteOne({ filter }: { filter: FilterQuery<TDocument> }): Promise<boolean> {
    const result = await this.model.deleteOne(filter);
    return result.deletedCount > 0;
  }

  /**
   * Delete by ID
   */
  async deleteById({ id, options }: { id: string; options?: QueryOptions }): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id, options);
    return result != null;
  }

  /**
   * Count documents
   */
  async count({ filter }: { filter: FilterQuery<TDocument> }): Promise<number> {
    return this.model.countDocuments(filter);
  }

  /**
   * Check if exists
   */
  async exists({ filter }: { filter: FilterQuery<TDocument> }): Promise<boolean> {
    const result = await this.model.exists(filter);
    return !!result;
  }

  /**
   * Paginate results with populate & select
   */
  async paginate({
    filter,
    limit,
    opts,
    page,
  }: {
    filter: FilterQuery<TDocument>;
    page: number;
    limit: number;
    opts?: FindOptions<TDocument>;
  }): Promise<{ data: HydratedDocument<TDocument>[]; total: number }> {
    const skip = (page - 1) * limit;

    const query = this.model.find(filter, opts?.projection, {
      ...opts?.options,
      skip,
      limit,
    });

    if (opts?.populate) query.populate(opts?.populate as PopulateOptions[]);
    if (opts?.select) query.select(opts?.select);

    const [data, total] = await Promise.all([query.exec(), this.model.countDocuments(filter)]);

    return { data, total };
  }
}
