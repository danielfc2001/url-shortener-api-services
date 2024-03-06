import urlModel from "../schemas/urlModel.js";

const LINK_SERVICE_HOSTNAME = process.env.LINK_SERVICE_HOSTNAME;

export const searchShortenedsUrls = async (req, res) => {
  const { search } = req.query;
  const { user } = req.body;
  try {
    const allUrls = await urlModel.find({ userId: user._id });
    if (search.length === 0) {
      res.status(200).json({
        urls: allUrls,
        message: "Se a realizado la busqueda con exito.",
      });
    }
    const matches = allUrls.filter((el) => {
      if (
        (el.title && el.title.includes(search)) ||
        (el.description && el.description.includes(search)) ||
        el.baseUrl.includes(search)
      ) {
        return el;
      } else {
        return undefined;
      }
    });

    if (matches.length === 0)
      return res
        .status(400)
        .json({ message: "No se encontraron coincidencias en el servidor." });
    res.status(200).json({
      urls: matches,
      message: "Se a realizado la busqueda con exito.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "A ocurrido un error al procesar la solicitud." });
  }
};

export const getAllShortenedsUrl = async (req, res) => {
  try {
    const found = await urlModel.find({ userId: req.body.user?._id });
    if (!found)
      throw {
        message: "An error occurred while processing the request.",
      };
    res.status(200).json({
      data: found,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const createShortenedUrl = async (req, res) => {
  try {
    const { data, user } = req.body;
    console.log(data, user);
    if (user) {
      const newUrl = new urlModel({
        userId: user._id,
        title: data.title ?? undefined,
        description: data.description ?? undefined,
        baseUrl: data.baseUrl,
        shortUrl: `${LINK_SERVICE_HOSTNAME}/${Math.random()
          .toString(36)
          .substring(2)}`,
        isUnlocked: true,
      });
      const savedUrl = await newUrl.save();
      if (savedUrl) {
        res.status(201).json({
          data: savedUrl,
        });
      }
    } else {
      const newUrl = new urlModel({
        baseUrl: data.baseUrl,
        shortUrl: `${LINK_SERVICE_HOSTNAME}/${Math.random()
          .toString(36)
          .substring(2)}`,
        isUnlocked: true,
      });
      const savedData = await newUrl.save();
      if (savedData) {
        return res.json({
          shortUrl: savedData.shortUrl,
        });
      }
    }
  } catch (er) {
    res.status(500).json({ message: er.message });
  }
};

export const updateShortenedUrl = async (req, res) => {
  const { id } = req.params;
  const { data, user } = req.body;
  try {
    const found = await urlModel.findById(id);
    if (!found)
      throw new Error(
        "No se encuentra el dato especificado en la base de datos."
      );
    const update = await urlModel.findByIdAndUpdate(id, data, { new: true });
    if (!update)
      throw new Error("A ocurrido un error al procesar la solicitud.");
    res.status(200).json({
      update,
      message: "Se actualizaron los datos satisfactoriamente",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteShortenedUrl = async (req, res) => {
  const { id } = req.params;
  try {
    const urlFound = await urlModel.findById(id);
    if (!urlFound)
      return res
        .status(400)
        .json({ message: "No se han encontrado los datos especificados." });
    const urlDeleted = await urlModel.findByIdAndDelete(id);
    if (!urlDeleted)
      return res
        .status(400)
        .json({ message: "No se han podido eliminar los datos." });
    return res.status(200).json({
      message: "Datos eliminados satisfactoriamente.",
      deleted: urlDeleted,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "A ocurrido un error al procesar la solicitud." });
  }
};
