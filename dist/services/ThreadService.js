"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ThreadValidator_1 = require("../validators/ThreadValidator");
const cloudinary_1 = require("cloudinary");
class ThreadService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async find() {
        try {
            return await this.prisma.thread.findMany({
                include: {
                    user: {
                        select: {
                            fullName: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            this.handleError("Error retrieving threads", error);
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.thread.findFirst({
                where: { id },
                include: {
                    user: {
                        select: {
                            fullName: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            this.handleError("Error retrieving thread", error);
        }
    }
    async create(dto) {
        try {
            console.log("DTO before validation:", dto);
            await ThreadValidator_1.ThreadSchema.validateAsync(dto);
            console.log("DTO after validation:", dto);
            let imageUrl = null;
            if (dto.image) {
                const uploadResult = await cloudinary_1.v2.uploader.upload(dto.image, {
                    upload_preset: "CircleApp",
                });
                imageUrl = uploadResult.secure_url;
            }
            const threadData = Object.assign(Object.assign({}, dto), { image: imageUrl, totalLikes: dto.totalLikes ? Number(dto.totalLikes) : 0, totalReplies: dto.totalReplies ? Number(dto.totalReplies) : 0 });
            console.log("Creating thread with data:", threadData);
            return await this.prisma.thread.create({ data: threadData });
        }
        catch (error) {
            this.handleError("Error creating thread", error);
        }
    }
    async update(id, dto) {
        try {
            await ThreadValidator_1.ThreadSchema.validateAsync(dto);
            const threadData = Object.assign(Object.assign({}, dto), { totalLikes: dto.totalLikes ? Number(dto.totalLikes) : 0, totalReplies: dto.totalReplies ? Number(dto.totalReplies) : 0 });
            console.log("Updating thread with id:", id, "and data:", threadData);
            return await this.prisma.thread.update({
                where: { id },
                data: threadData,
            });
        }
        catch (error) {
            this.handleError("Error updating thread", error);
        }
    }
    async delete(id) {
        try {
            await this.prisma.$transaction([
                this.prisma.thread.delete({ where: { id } }),
                this.prisma.like.deleteMany({ where: { threadId: id } }),
                this.prisma.reply.deleteMany({ where: { threadId: id } }),
            ]);
            console.log("Thread deleted with id:", id);
        }
        catch (error) {
            this.handleError("Error deleting thread", error);
        }
    }
    handleError(message, error) {
        console.error(message, error);
        if (error instanceof Error) {
            throw new Error(`${message}: ${error.message}`);
        }
        else {
            throw new Error(message);
        }
    }
}
exports.default = ThreadService;
//# sourceMappingURL=ThreadService.js.map