import errorHandler from "../utils/errorHandler.js"
import comicModel from "../models/ComicModel.js"

const createComic = async (req, res, next) => {
    try {
        const { bookName, authorName, yearOfPublication, price, discount = 0, numberOfPages, condition, description = "" } = req.body;
        const comic = await comicModel.create({
            bookName, authorName, yearOfPublication, price, discount, numberOfPages, condition, description
        })

        return res.status(201).json({
            success: true,
            message: "Comic Book Created & Added Successfully !",
            comic
        })
    } catch (error) {
        return next(error);
    }
}

const editComic = async (req, res, next) => {
    try {
        const updations = req.body;
        const { id } = req.params;

        // check if comic exists
        const existingComic = await comicModel.findOne({ _id: id });
        if (!existingComic) return next(errorHandler(404, "No Comic Book with the given ID is found !"));

        const updatedComic = await comicModel.findByIdAndUpdate(id, { ...updations }, {
            new: true, runValidators: true

        });
        return res.status(200).json({
            success: true,
            message: "Comic Book successfully Updated !",
            comic: updatedComic
        })
    } catch (error) {
        return next(error);
    }
}

const deleteComic = async (req, res, next) => {
    try {
        let { id } = req.params;
        // check if comic exists
        const existingComic = await comicModel.findOne({ _id: id });

        if (!existingComic) return next(errorHandler(404, "No Comic Book with the given ID is found !"));

        const deletedComic = await comicModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Comic Book Deleted successfully!",
            deletedComic
        })
    } catch (error) {
        return next(error)
    }
}

const getComicByFilters = async (req, res, next) => {
    try {
        const { page = 1, limit = 5, bookName, authorName, yearOfPublication, price, discount, numberOfPages, condition, sortBy } = req.body;
        let filters = {};
        if (bookName) filters.bookName = bookName;
        if (authorName) filters.authorName = authorName;
        if (yearOfPublication) filters.yearOfPublication = yearOfPublication;
        if (price) filters.price = price;
        if (discount) filters.discount = discount;
        if (numberOfPages) filters.numberOfPages = numberOfPages;
        if (condition) filters.condition = condition;

        let fieldName, order;

        if (sortBy) {

            fieldName = sortBy.fieldName;
            order = sortBy.order;
            if (order === 'asc') order = 1;
            else order = -1;
        }

        const results = await comicModel.find(filters).skip((page - 1) * limit)
            .limit(limit)
            .sort({ [fieldName]: order }
            )

        return res.status(200).json({
            success: true,
            message: "Comics filtered Suceeesfully!",
            comics: results.length ? results : "No Comics available according to filters !"
        })
    } catch (error) {
        return next(error)
    }
}


const getComicById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) next(errorHandler(404, "Please provide the Id of the comic !"));

        const comic = await comicModel.findOne({ _id: id });

        if (!comic) return next(errorHandler(404, "No Comic found according to given ID!"));

        return res.status(200).json({
            success: true,
            message: "Comic with given ID successfully Fetched !",
            comic
        })
    } catch (error) {
        return next(error)
    }
}







export { createComic, editComic, deleteComic, getComicByFilters, getComicById }