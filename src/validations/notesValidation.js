import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllNotesSchema = {
  [Segments.BODY]: Joi.object({
    page: Joi.number().integer().min(1).required().default(1).messages({
      "number.min": "Page must be at least 1",
      "any.required": "Page is required",
    }),
    perPage: Joi.number().integer().min(5).max(20).required().default(10).messages({
      "number.min": "Number of notes per page must be {#limit} or higher",
      "number.max": "The amount of notes per page cannot exceed {#limit}",
      "any.required": "Amount of notes per page is required",
    }),
    tag: Joi.string().valid(TAGS),
    search : Joi.string(),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.min": "Title must be at least 1 character long",
      "any.required": "Title is required",
    }),
    content: Joi.string(),
    tag: Joi.string().valid(TAGS),
  })
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.min": "Title must be at least 1 character long",
      "any.required": "Title is required",
    }),
    content: Joi.string(),
    tag: Joi.string().valid(TAGS),
  })
};
