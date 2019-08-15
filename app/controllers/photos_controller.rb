class PhotosController < ApplicationController
  def index
    respond_to do |format|
      format.json  { render :json => Photo.all}
    end
  end

  def new
    @photo = Photo.new
    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @photo = Photo.create(photo_params)
    if @photo.save
      flash[:notice] = 'Successfully added photo'
      redirect_to :root
    else
      flash[:error] = 'Unable to add photo'
      redirect_to :back
    end
  end

  private 
  def photo_params
    params.require(:photo).permit(:image,:lat, :lng)
  end
end