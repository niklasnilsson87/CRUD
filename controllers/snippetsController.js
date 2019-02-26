/**
 * Module for snippetsController
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const SnippetItem = require('../models/SnippetItem')

const snippetsController = {}

/**
 * index GET
 */
snippetsController.index = async (req, res, next) => {
  try {
    const locals = {
      snippetItems: (await SnippetItem.find({}))
        .map(snippetItem => ({
          id: snippetItem._id,
          description: snippetItem.description,
          done: snippetItem.done,
          author: snippetItem.author,
          owner: snippetItem.author === req.session.username
        }))
    }
    res.render('snippets/index', { locals })
  } catch (error) {
    next(error)
  }
}

/**
 * create GET
 */
snippetsController.create = async (req, res, next) => {
  const locals = {
    description: '',
    done: false
  }
  res.render('snippets/create', { locals })
}

/**
 * create POST
 */
snippetsController.createPost = async (req, res, next) => {
  try {
    const snippetItem = new SnippetItem({
      description: req.body.description,
      done: req.body.done,
      author: req.session.username
    })

    await snippetItem.save()

    req.session.flash = { type: 'success', text: 'Code-Snippet was created successfully.' }
    res.redirect('.')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('./create')
  }
}

/**
 * edit GET
 */
snippetsController.edit = async (req, res, next) => {
  try {
    const snippetItem = await SnippetItem.findOne({ _id: req.params.id })
    if (snippetItem.author === req.session.username) {
      const locals = {
        id: snippetItem._id,
        description: snippetItem.description,
        done: snippetItem.done
      }
      res.render('snippets/edit', { locals })
    } else {
      req.session.flash = { type: 'danger', text: 'Only author can change snippet' }
      res.redirect('/snippets')
    }
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('.')
  }
}

/**
 * edit POST
 */
snippetsController.editPost = async (req, res, next) => {
  try {
    const result = await SnippetItem.updateOne({ _id: req.body.id }, {
      description: req.body.description,
      done: req.body.done === 'on'
    })

    if (result.nModified === 1) {
      req.session.flash = { type: 'success', text: 'Code-Snippet was updated successfully.' }
    } else {
      req.session.flash = {
        type: 'danger',
        text: 'The snippet you attempted to update was removed by another user after you got the original values.'
      }
    }
    res.redirect('.')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect(`./edit/${req.body.id}`)
  }
}

/**
 * delete GET
 */
snippetsController.delete = async (req, res, next) => {
  try {
    const snippetItem = await SnippetItem.findOne({ _id: req.params.id })
    if (snippetItem.author === req.session.username) {
      const locals = {
        id: snippetItem._id,
        description: snippetItem.description,
        done: snippetItem.done
      }
      res.render('snippets/delete', { locals })
    } else {
      req.session.flash = { type: 'danger', text: 'Only author can delete snippet' }
      res.redirect('/snippets')
    }
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('.')
  }
}

/**
 * delete POST
 */
snippetsController.deletePost = async (req, res, next) => {
  try {
    await SnippetItem.deleteOne({ _id: req.body.id })

    req.session.flash = { type: 'success', text: 'Code-snippet was removed successfully.' }
    res.redirect('.')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    req.redirect(`./delete/${req.body.id}`)
  }
}

// Exports.
module.exports = snippetsController
